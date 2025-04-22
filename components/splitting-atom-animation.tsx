"use client"

import { useEffect, useRef } from "react"

export default function SplittingAtomAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      } else {
        canvas.width = 300
        canvas.height = 150
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Decay chain elements with their properties
    const decayChain = [
      { element: "U-238", protons: 92, neutrons: 146, halfLife: 4.5, decayType: "alpha" },
      { element: "Th-234", protons: 90, neutrons: 144, halfLife: 24.1, decayType: "beta" },
      { element: "Pa-234", protons: 91, neutrons: 143, halfLife: 6.7, decayType: "beta" },
      { element: "U-234", protons: 92, neutrons: 142, halfLife: 245500, decayType: "alpha" },
      { element: "Th-230", protons: 90, neutrons: 140, halfLife: 75380, decayType: "alpha" },
      { element: "Ra-226", protons: 88, neutrons: 138, halfLife: 1600, decayType: "alpha" },
      { element: "Rn-222", protons: 86, neutrons: 136, halfLife: 3.8, decayType: "alpha" },
      { element: "Po-218", protons: 84, neutrons: 134, halfLife: 3.1, decayType: "alpha" },
      { element: "Pb-214", protons: 82, neutrons: 132, halfLife: 26.8, decayType: "beta" },
      { element: "Bi-214", protons: 83, neutrons: 131, halfLife: 19.9, decayType: "beta" },
      { element: "Po-214", protons: 84, neutrons: 130, halfLife: 0.000164, decayType: "alpha" },
      { element: "Pb-210", protons: 82, neutrons: 128, halfLife: 22.3, decayType: "beta" },
      { element: "Bi-210", protons: 83, neutrons: 127, halfLife: 5.01, decayType: "beta" },
      { element: "Po-210", protons: 84, neutrons: 126, halfLife: 138.4, decayType: "alpha" },
      { element: "Pb-206", protons: 82, neutrons: 124, halfLife: Number.POSITIVE_INFINITY, decayType: "stable" },
    ]

    // Colors
    const colors = {
      proton: "#facc15", // yellow-400
      neutron: "#f97316", // orange-500
      electron: "#facc15", // yellow-400
      alpha: "#ef4444", // red-500
      beta: "#3b82f6", // blue-500
      gamma: "#10b981", // emerald-500
      orbit: "rgba(250, 204, 21, 0.2)", // yellow-400 with opacity
      text: "#ffffff", // white
    }

    // Animation state
    let currentElementIndex = 0
    let decayProgress = 0
    let decayStartTime = 0
    let isDecaying = false
    let emittedParticles: EmittedParticle[] = []
    let electrons: Electron[] = []

    // Initialize the first element
    const initializeElement = (elementIndex: number) => {
      const element = decayChain[elementIndex]
      electrons = []

      // Create electrons for the element
      const electronCount = element.protons
      for (let i = 0; i < electronCount; i++) {
        const shellIndex = Math.min(Math.floor(i / 8), 2) // Max 3 shells
        const electronsInShell = Math.min(8, electronCount - shellIndex * 8)
        const angleStep = (2 * Math.PI) / electronsInShell
        const shellRadius = 30 + shellIndex * 25
        const angleOffset = shellIndex * (Math.PI / electronsInShell)

        const electronIndex = i - shellIndex * 8
        const angle = angleOffset + electronIndex * angleStep

        electrons.push({
          shellIndex,
          angle,
          orbitRadius: shellRadius,
          speed: 0.001 - shellIndex * 0.0002, // Outer shells move slower
          radius: 3,
        })
      }
    }

    // Start with the first element
    initializeElement(0)

    // Start decay process
    const startDecay = (time: number) => {
      if (currentElementIndex < decayChain.length - 1) {
        isDecaying = true
        decayStartTime = time

        // Clear any existing emitted particles
        emittedParticles = []
      }
    }

    // Handle decay completion
    const completeDecay = () => {
      isDecaying = false
      currentElementIndex++

      if (currentElementIndex < decayChain.length) {
        initializeElement(currentElementIndex)
      }

      // If we reached the end, restart after a delay
      if (currentElementIndex >= decayChain.length - 1) {
        setTimeout(() => {
          currentElementIndex = 0
          initializeElement(0)
        }, 3000)
      }
    }

    // Animation loop
    let animationFrameId: number
    let lastTime = 0

    const animate = (time: number) => {
      const deltaTime = lastTime ? time - lastTime : 0
      lastTime = time

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Center position
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Current element
      const currentElement = decayChain[currentElementIndex]

      // Randomly start decay if not already decaying
      if (!isDecaying && Math.random() < 0.005) {
        startDecay(time)
      }

      // Handle decay animation
      if (isDecaying) {
        const decayDuration = 2000 // 2 seconds for decay animation
        decayProgress = (time - decayStartTime) / decayDuration

        if (decayProgress >= 1) {
          completeDecay()
        } else {
          // Emit particles based on decay type
          if (decayProgress > 0.5 && emittedParticles.length === 0) {
            const decayType = currentElement.decayType

            if (decayType === "alpha") {
              // Alpha decay - emit alpha particle (2 protons, 2 neutrons)
              const angle = Math.random() * Math.PI * 2
              const speed = 0.8 + Math.random() * 0.4
              emittedParticles.push({
                type: "alpha",
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 6,
                life: 100,
              })
            } else if (decayType === "beta") {
              // Beta decay - emit beta particle (electron)
              const angle = Math.random() * Math.PI * 2
              const speed = 1.2 + Math.random() * 0.6
              emittedParticles.push({
                type: "beta",
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 3,
                life: 120,
              })

              // Sometimes emit gamma ray with beta decay
              if (Math.random() < 0.5) {
                const gammaAngle = angle + ((Math.random() - 0.5) * Math.PI) / 2
                const gammaSpeed = 1.5 + Math.random() * 0.8
                emittedParticles.push({
                  type: "gamma",
                  x: centerX,
                  y: centerY,
                  vx: Math.cos(gammaAngle) * gammaSpeed,
                  vy: Math.sin(gammaAngle) * gammaSpeed,
                  radius: 2,
                  life: 150,
                })
              }
            }
          }
        }
      }

      // Draw nucleus
      const nucleusRadius = 20 + Math.sqrt(currentElement.protons + currentElement.neutrons) * 0.8

      // Draw neutrons and protons in nucleus
      const particleRadius = 3
      const particlesPerRow = Math.ceil(Math.sqrt(currentElement.protons + currentElement.neutrons))
      const gridSize = particleRadius * 2.5

      let protonCount = 0
      let neutronCount = 0

      for (let i = 0; i < particlesPerRow; i++) {
        for (let j = 0; j < particlesPerRow; j++) {
          const offsetX = (i - particlesPerRow / 2) * gridSize
          const offsetY = (j - particlesPerRow / 2) * gridSize
          const distFromCenter = Math.sqrt(offsetX * offsetX + offsetY * offsetY)

          if (distFromCenter < nucleusRadius - particleRadius) {
            // Determine if this is a proton or neutron
            let isProton

            if (protonCount < currentElement.protons && neutronCount < currentElement.neutrons) {
              // Randomly choose if we still have both available
              isProton = Math.random() < 0.5
            } else if (protonCount < currentElement.protons) {
              isProton = true
            } else if (neutronCount < currentElement.neutrons) {
              isProton = false
            } else {
              continue // Skip if we've placed all particles
            }

            if (isProton) {
              protonCount++
              ctx.fillStyle = colors.proton
            } else {
              neutronCount++
              ctx.fillStyle = colors.neutron
            }

            ctx.beginPath()
            ctx.arc(centerX + offsetX, centerY + offsetY, particleRadius, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Draw electron shells
      const electronShells = [1, 2, 3].map((i) => 30 + (i - 1) * 25)
      electronShells.forEach((radius, i) => {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = colors.orbit
        ctx.stroke()
      })

      // Update and draw electrons
      electrons.forEach((electron) => {
        electron.angle += electron.speed * deltaTime
        const x = centerX + Math.cos(electron.angle) * electron.orbitRadius
        const y = centerY + Math.sin(electron.angle) * electron.orbitRadius

        ctx.beginPath()
        ctx.arc(x, y, electron.radius, 0, Math.PI * 2)
        ctx.fillStyle = colors.electron
        ctx.fill()
      })

      // Update and draw emitted particles
      for (let i = emittedParticles.length - 1; i >= 0; i--) {
        const particle = emittedParticles[i]

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Update life
        particle.life -= 1
        if (
          particle.life <= 0 ||
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          emittedParticles.splice(i, 1)
          continue
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)

        // Different colors for different particle types
        if (particle.type === "alpha") {
          ctx.fillStyle = colors.alpha
        } else if (particle.type === "beta") {
          ctx.fillStyle = colors.beta
        } else if (particle.type === "gamma") {
          ctx.fillStyle = colors.gamma
        }

        ctx.fill()

        // Draw trail for gamma rays
        if (particle.type === "gamma") {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5)
          ctx.strokeStyle = `rgba(16, 185, 129, ${particle.life / 150})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }

      // Draw element name and decay type
      ctx.font = "14px sans-serif"
      ctx.fillStyle = colors.text
      ctx.textAlign = "center"
      ctx.fillText(currentElement.element, centerX, centerY - nucleusRadius - 25)

      if (currentElement.decayType !== "stable") {
        ctx.font = "12px sans-serif"
        ctx.fillText(
          `Decay: ${currentElement.decayType === "alpha" ? "α" : "β"}`,
          centerX,
          centerY - nucleusRadius - 10,
        )
      } else {
        ctx.font = "12px sans-serif"
        ctx.fillText("Stable isotope", centerX, centerY - nucleusRadius - 10)
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation
    animationFrameId = requestAnimationFrame(animate)

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}

// Types
interface Electron {
  shellIndex: number
  angle: number
  orbitRadius: number
  speed: number
  radius: number
}

interface EmittedParticle {
  type: "alpha" | "beta" | "gamma"
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
}
