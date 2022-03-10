import StateMachineGoapAI from "../../../Wolfie2D/AI/StateMachineGoapAI";
import GoapAction from "../../../Wolfie2D/DataTypes/Interfaces/GoapAction";
import Vec2 from "../../../Wolfie2D/DataTypes/Vec2";
import Emitter from "../../../Wolfie2D/Events/Emitter";
import GameNode from "../../../Wolfie2D/Nodes/GameNode";
import NavigationPath from "../../../Wolfie2D/Pathfinding/NavigationPath";
import { hw4_Names } from "../../hw4_constants";
import EnemyAI from "../EnemyAI";

export default class Retreat extends GoapAction {
    private retreatDistance: number;

    private path: NavigationPath;
    protected emitter: Emitter;

    constructor(cost: number, preconditions: Array<string>, effects: Array<string>, options?: Record<string, any>) {
        super();
        this.cost = cost;
        this.preconditions = preconditions;
        this.loopAction = true;
        this.effects = effects;
        this.retreatDistance = options.retreatDistance;
    }

    // HOMEWORK 4 - TODO
    /**
     * Implement retreat action so that the enemy constantly moves away from the player until they get past the retreatDistance. If they succesfully move 
     * far away enough, they heal back to their max health. The low health status should NOT be removed, once an enemy is low health, that remains
     * as a status signaling the enemy has gotten below a certain health once.
     * 
     * The knife enemy will keep attacking if they're still
     * in range, only retreating if the player moves away from them.
     * 
     * Look at other actions for hints as to how this can be implemented, and know that there's a function in Active.ts that is needed to fully implement
     * this. You'll know this action if working correctly if a retreating enemy changes their retreat direction if the player moves around, trying to get
     * as far away as possible.
     */
    performAction(statuses: Array<string>, actor: StateMachineGoapAI, deltaT: number, target?: StateMachineGoapAI): Array<string> {
        if (this.checkPreconditions(statuses)) {
            // Retreat

            //Check distance from player
            let enemy = <EnemyAI>actor;
            let playerPos = enemy.lastPlayerPos;
            let distance = enemy.owner.position.distanceTo(playerPos);
            // console.log("Low Health?");
            if (distance <= this.retreatDistance) { // Close to player and we have low_health triggered, so we should retreat
                // console.log(this.effects);
                // console.log("Low Health Confirmed! at distance: " + distance);

                // Moves Player in the direction
                this.path = enemy.retreatPath;
                enemy.owner.rotation = Vec2.UP.angleToCCW(this.path.getMoveDirection(enemy.owner));
                enemy.owner.moveOnPath(enemy.speed * deltaT, this.path);
                // console.log(this.path);

                return null;
            }

            enemy.health = enemy.maxHealth; // Heal Up?

            this.path = enemy.retreatPath; // Now Come back
            enemy.owner.rotation = Vec2.UP.angleToCCW(this.path.getMoveDirection(enemy.owner).scale(100));
            enemy.owner.moveOnPath(enemy.speed * deltaT, this.path);
        }
        return this.effects;
    }

    updateCost(options: Record<string, number>): void {}

    toString(): string {
        return "(Retreat)";
    }

}