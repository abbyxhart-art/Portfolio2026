import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"

interface LSystemGardenProps {
    onHasFlowers?: (hasFlowers: boolean) => void
}

export interface LSystemGardenHandle {
    reset: () => void
}

const LSystemGarden = forwardRef<LSystemGardenHandle, LSystemGardenProps>(
function LSystemGarden({ onHasFlowers }, ref) {
    const canvasRef = useRef(null)
    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [plantRow, setPlantRow] = useState([])
    const [flowerColors, setFlowerColors] = useState([])
    const [plantGrowthLevels, setPlantGrowthLevels] = useState([])
    const [plantStates, setPlantStates] = useState([])
    const [plantOpacities, setPlantOpacities] = useState([])

    // L-System patterns
    const patterns = {
        a: { n: 5, angle: 25.7, axiom: "F", rules: { F: "F[+F]F[-F]F" } },
        d: {
            n: 7,
            angle: 20,
            axiom: "X",
            rules: { X: "F[+X]F[-X]+X", F: "FF" },
        },
        f: {
            n: 5,
            angle: 22.5,
            axiom: "X",
            rules: { X: "F-[[X]+X]+F[+FX]-X", F: "FF" },
        },
    }

    // Generate random plant row on mount - ONLY ONCE
    useEffect(() => {
        // "a" and "f" are common; "d" is rare
        const patternKeys = ["a", "f", "a", "f", "a", "a", "f", "d"]
        const colors = ["#DDFF00", "#9A47FF"]
        const numPlants = 22

        // Generate plants ensuring no two of the same type are adjacent
        const randomPlants = []
        let lastPattern = null

        for (let i = 0; i < numPlants; i++) {
            let availablePatterns = patternKeys.filter((p) => p !== lastPattern)
            if (availablePatterns.length === 0) availablePatterns = patternKeys
            const selectedPattern =
                availablePatterns[
                    Math.floor(Math.random() * availablePatterns.length)
                ]
            randomPlants.push(selectedPattern)
            lastPattern = selectedPattern
        }

        const randomColors = Array.from(
            { length: numPlants },
            () => colors[Math.floor(Math.random() * colors.length)]
        )
        setPlantRow(randomPlants)
        setFlowerColors(randomColors)
        setPlantGrowthLevels(Array(numPlants).fill(0))
        setPlantStates(Array(numPlants).fill("idle"))
        setPlantOpacities(Array(numPlants).fill(1))
    }, [])

    // Generate L-System string
    const generateLSystem = (axiom, rules, iterations) => {
        let current = axiom
        for (let i = 0; i < iterations; i++) {
            let next = ""
            for (let char of current) {
                next += rules[char] || char
            }
            current = next
        }
        return current
    }

    // Seeded random function for consistent flower placement
    const seededRandom = (seed) => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
    }

    // Draw a small leaf
    const drawLeaf = (ctx, x, y, direction, size, side, stemColor) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(((direction + side * 45) * Math.PI) / 180)

        ctx.fillStyle = stemColor
        ctx.beginPath()
        ctx.ellipse(0, 0, size * 0.8, size * 2, 0, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
    }

    // Draw a minimalistic flower
    const drawFlower = (ctx, x, y, size, color, stemColor) => {
        ctx.fillStyle = color
        ctx.strokeStyle = stemColor
        ctx.lineWidth = 1.5

        ctx.beginPath()
        ctx.moveTo(x, y - size)
        ctx.lineTo(x + size, y)
        ctx.lineTo(x, y + size)
        ctx.lineTo(x - size, y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
    }

    // Draw a segment marker
    const drawSegment = (ctx, x, y, direction, size, stemColor) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate((direction * Math.PI) / 180)

        ctx.fillStyle = stemColor
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size * 0.7, 0)
        ctx.lineTo(0, size)
        ctx.lineTo(-size * 0.7, 0)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }

    // Draw using turtle graphics with decorative elements
    const drawLSystem = (
        ctx,
        lSystem,
        angle,
        startX,
        startY,
        length,
        flowerColor,
        stemColor,
        growthProgress,
        patternKey,
        plantOpacity = 1
    ) => {
        const stack = []
        let x = startX
        let y = startY
        let direction = -90
        let branchDepth = 0
        let segmentCount = 0
        let flowerSeed = 0

        ctx.globalAlpha = plantOpacity
        ctx.strokeStyle = stemColor
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"

        for (let i = 0; i < lSystem.length; i++) {
            const char = lSystem[i]

            switch (char) {
                case "F":
                    const newX = x + length * Math.cos((direction * Math.PI) / 180)
                    const newY = y + length * Math.sin((direction * Math.PI) / 180)

                    ctx.strokeStyle = stemColor

                    ctx.beginPath()
                    ctx.moveTo(x, y)
                    ctx.lineTo(newX, newY)
                    ctx.stroke()

                    segmentCount++
                    flowerSeed++

                    if (
                        branchDepth <= 1 &&
                        segmentCount % 3 === 0 &&
                        growthProgress > 0.3
                    ) {
                        drawSegment(
                            ctx,
                            (x + newX) / 2,
                            (y + newY) / 2,
                            direction,
                            2,
                            stemColor
                        )
                    }

                    if (
                        branchDepth >= 2 &&
                        branchDepth <= 4 &&
                        segmentCount % 2 === 0 &&
                        growthProgress > 0.5 &&
                        patternKey !== "d"
                    ) {
                        drawLeaf(ctx, newX, newY, direction, 3, 1, stemColor)
                        drawLeaf(ctx, newX, newY, direction, 3, -1, stemColor)
                    }

                    if (
                        branchDepth >= 3 &&
                        i < lSystem.length - 1 &&
                        lSystem[i + 1] === "]" &&
                        growthProgress > 0.7
                    ) {
                        if (seededRandom(flowerSeed) > 0.4) {
                            drawFlower(ctx, newX, newY, 8, flowerColor, stemColor)
                        }
                    }


                    x = newX
                    y = newY
                    break

                case "X":
                    const moveX = x + length * Math.cos((direction * Math.PI) / 180)
                    const moveY = y + length * Math.sin((direction * Math.PI) / 180)
                    x = moveX
                    y = moveY
                    break

                case "+":
                    direction += angle
                    break

                case "-":
                    direction -= angle
                    break

                case "[":
                    stack.push({ x, y, direction, branchDepth, segmentCount })
                    branchDepth++
                    segmentCount = 0
                    break

                case "]":
                    const state = stack.pop()
                    x = state.x
                    y = state.y
                    direction = state.direction
                    branchDepth = state.branchDepth
                    segmentCount = state.segmentCount
                    break
            }
        }

        ctx.globalAlpha = 1
    }

    // Animate plant growth based on mouse proximity
    useEffect(() => {
        if (plantRow.length === 0) return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const spacing = rect.width / (plantRow.length + 1)

        const interval = setInterval(() => {
            setPlantStates((prevStates) => {
                const newStates = [...prevStates]

                setPlantOpacities((prevOpacities) =>
                    prevOpacities.map((opacity, index) => {
                        const s = prevStates[index]
                        return s === "growing" || s === "fully_grown"
                            ? Math.min(1, opacity + 0.1)
                            : opacity
                    })
                )

                setPlantGrowthLevels((prev) =>
                    prev.map((currentGrowth, index) => {
                        const currentState = prevStates[index]
                        if (currentState === "fully_grown") return currentGrowth

                        const plantX = spacing * (index + 1)
                        const distance = Math.abs(mouseX - plantX)
                        const hoverRadius = 80
                        const pattern = patterns[plantRow[index]]
                        const isMouseNear = isMouseOver && distance < hoverRadius

                        if (!isMouseNear) return currentGrowth // pause, no decay

                        if (currentGrowth >= pattern.n * 0.98) {
                            newStates[index] = "fully_grown"
                            return currentGrowth
                        }

                        newStates[index] = "growing"
                        const growthProgress = currentGrowth / pattern.n
                        const growthSpeed = 0.15 - growthProgress * 0.13
                        const diff = pattern.n - currentGrowth
                        const easing = Math.pow(Math.abs(diff) / pattern.n, 0.7)
                        const midSlow = 1 - 0.5 * Math.sin(growthProgress * Math.PI)
                        return currentGrowth + diff * growthSpeed * easing * midSlow
                    })
                )

                return newStates
            })
        }, 10)

        return () => clearInterval(interval)
    }, [mouseX, mouseY, isMouseOver, plantRow])

    // Draw effect
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || plantRow.length === 0) return

        const ctx = canvas.getContext("2d")

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()

        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr

        ctx.scale(dpr, dpr)

        const width = rect.width
        const height = rect.height

        ctx.clearRect(0, 0, width, height)

        // Clip all drawing to the canvas bounds so plants can't overflow
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, width, height)
        ctx.clip()

        const spacing = width / (plantRow.length + 1)

        plantRow.forEach((patternKey, index) => {
            const pattern = patterns[patternKey]
            const x = spacing * (index + 1)
            const flowerColor = flowerColors[index] || "#DDFF00"

            const growthLevel = plantGrowthLevels[index] || 0

            if (growthLevel < 0.1) return
            if (x < 420) return // left text area: RIT block ends at ~400px

            const targetIteration = Math.max(1, growthLevel)
            const currentIter = Math.floor(targetIteration)
            const progressInIter = targetIteration - currentIter

            const lSystem = generateLSystem(
                pattern.axiom,
                pattern.rules,
                currentIter
            )

            const charsToRender = Math.floor(lSystem.length * progressInIter)
            const partialLSystem =
                progressInIter > 0
                    ? lSystem.substring(0, charsToRender)
                    : lSystem

            // Peak in center, ~100px at left edge, very short on right to clear nav
            const centerProgress = 1 - Math.abs(x - width / 2) / (width / 2)
            let heightMultiplier = 0.25 + 0.75 * Math.pow(centerProgress, 0.6)
            if (x > width * 0.5) {
                const rightProgress = (x - width * 0.5) / (width * 0.5)
                heightMultiplier *= 1 - rightProgress * 0.8
            }
            const baseLength = (100 / Math.pow(2, currentIter - 1)) * heightMultiplier

            const stemColor = "#1D1C20"
            const growthProgress = growthLevel / pattern.n

            const plantOpacity = plantOpacities[index] || 0

            // Draw from the very bottom of the frame
            drawLSystem(
                ctx,
                partialLSystem,
                pattern.angle,
                x,
                height, // Bottom of viewport
                baseLength,
                flowerColor,
                stemColor,
                growthProgress,
                patternKey,
                plantOpacity
            )
        })

        ctx.restore()
    }, [plantGrowthLevels, plantRow, flowerColors, plantOpacities])

    // Track mouse via window so hover works even when content is layered above the canvas
    useEffect(() => {
        const handleMouseMove = (e) => {
            const canvas = canvasRef.current
            if (!canvas) return

            const rect = canvas.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            const inside =
                x >= 0 && x <= rect.width && y >= 0 && y <= rect.height

            setIsMouseOver(inside)
            if (inside) {
                setMouseX(x)
                setMouseY(y)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Notify parent when any plant has flowers (growthProgress > 0.7)
    useEffect(() => {
        if (plantRow.length === 0) return
        const hasFlowers = plantGrowthLevels.some((level, i) => {
            const pattern = patterns[plantRow[i]]
            return pattern && level / pattern.n > 0.7
        })
        onHasFlowers?.(hasFlowers)
    }, [plantGrowthLevels, plantRow, onHasFlowers])

    // Expose reset() to parent
    useImperativeHandle(ref, () => ({
        reset() {
            const count = plantRow.length
            setPlantStates(Array(count).fill("idle"))
            setPlantGrowthLevels(Array(count).fill(0))
            setPlantOpacities(Array(count).fill(0))
        },
    }), [plantRow.length])

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                margin: 0,
                padding: 0,
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    )
})

export default LSystemGarden
