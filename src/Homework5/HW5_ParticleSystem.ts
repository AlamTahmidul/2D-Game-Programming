import { TweenableProperties } from "../Wolfie2D/Nodes/GameNode";
import Particle from "../Wolfie2D/Nodes/Graphics/Particle";
import ParticleSystem from "../Wolfie2D/Rendering/Animations/ParticleSystem";
import Color from "../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../Wolfie2D/Utils/EaseFunctions";
import RandUtils from "../Wolfie2D/Utils/RandUtils";

// Resolved
/**
 * This particle system extends the base ParticleSystem class, and I reccommend you look at some of the implementation, 
 * at least for the default setParticleAnimation()
 * 
 * You'll just be handling the tweens for each particle for their animation, overriding the base implementation.
 * 
 * The new particle animation add these behaviors, along with the existing setParticleAnimation behaviors:
 * 
 *  - Each particle should look like they're affected by gravity, accelerating down over the course of their lifetime. This
 *  change should also be affected by the particle's mass, meaning particles with a higher mass should fall faster.
 * 
 *  - Each particle should disappear over it's lifetime, moving from an alpha of 1 to 0.
 */
export default class HW5_ParticleSystem extends ParticleSystem {

    setParticleAnimation(particle: Particle) {
        super.setParticleAnimation(particle);
        if (particle.mass == 1) {
            particle.color = Color.RED;
        } else if (particle.mass == 2) {
            particle.color = Color.GREEN;
        } else if (particle.mass == 3) {
            particle.color = Color.BLUE;
        }
        particle.vel = RandUtils.randVec(-50, 50, this.particleMass * 6, this.particleMass * 9.81 * this.lifetime/100);
        particle.tweens.add("active", {
            startDelay: 0,
            duration: this.lifetime,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.OUT_SINE
                }
            ] /* TODO: Add effects here */
        });
    }
}