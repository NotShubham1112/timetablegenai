/**
 * Simple CP-SAT Constraint Solver inspired by OR-Tools
 * Implements backtracking search with constraint propagation
 */

import { Variable, Domain, Constraint, CPModel, CPSolution } from './types';

export class ConstraintSolver {
    private model: CPModel;
    private maxIterations: number;
    private iteration: number;

    constructor(model: CPModel, maxIterations: number = 100000) {
        this.model = model;
        this.maxIterations = maxIterations;
        this.iteration = 0;
    }

    /**
     * Solve the constraint satisfaction problem
     */
    solve(): CPSolution {
        this.iteration = 0;
        const variables = Object.keys(this.model.variables);

        // Check if there are no variables
        if (variables.length === 0) {
            return { status: 'OPTIMAL', values: {} };
        }

        // Check if any variable has an empty domain
        for (const varName of variables) {
            if (this.model.variables[varName].domain.values.length === 0) {
                return { status: 'INFEASIBLE', values: {} };
            }
        }

        const result = this.backtrack({}, variables, 0);

        if (result) {
            const objectiveValue = this.model.objective
                ? this.model.objective(result)
                : undefined;
            return {
                status: objectiveValue !== undefined ? 'OPTIMAL' : 'FEASIBLE',
                values: result,
                objectiveValue,
            };
        }

        return { status: this.iteration >= this.maxIterations ? 'UNKNOWN' : 'INFEASIBLE', values: {} };
    }

    /**
     * Backtracking search with constraint checking
     */
    private backtrack(
        assignment: Record<string, number>,
        variables: string[],
        index: number
    ): Record<string, number> | null {
        // Check if all variables are assigned
        if (index >= variables.length) {
            // Verify all constraints
            if (this.checkAllConstraints(assignment)) {
                return assignment;
            }
            return null;
        }

        // Check iteration limit
        if (this.iteration++ >= this.maxIterations) {
            return null;
        }

        const varName = variables[index];
        const variable = this.model.variables[varName];

        // Try each value in the domain
        for (const value of variable.domain.values) {
            // Check forward constraints early (basic propagation)
            if (!this.canAssign(varName, value, assignment)) {
                continue;
            }

            // Make assignment
            assignment[varName] = value;

            // Check constraints incrementally
            if (this.checkConstraintsIncremental(assignment, varName)) {
                const result = this.backtrack(assignment, variables, index + 1);
                if (result !== null) {
                    return result;
                }
            }

            // Backtrack
            delete assignment[varName];
        }

        return null;
    }

    /**
     * Check if a value can be assigned (forward checking)
     */
    private canAssign(
        varName: string,
        value: number,
        assignment: Record<string, number>
    ): boolean {
        // Check constraints that involve this variable
        for (const constraint of this.model.constraints) {
            if (!constraint.variables.includes(varName)) continue;

            // If all other variables are assigned, check the constraint
            const otherVars = constraint.variables.filter(v => v !== varName);
            const allOthersAssigned = otherVars.every(v => assignment[v] !== undefined);

            if (allOthersAssigned) {
                const testAssignment = { ...assignment, [varName]: value };
                if (!constraint.satisfied(testAssignment)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check constraints incrementally after assignment
     */
    private checkConstraintsIncremental(
        assignment: Record<string, number>,
        justAssigned: string
    ): boolean {
        // Only check constraints that involve the just-assigned variable
        for (const constraint of this.model.constraints) {
            if (!constraint.variables.includes(justAssigned)) continue;

            // Check if all variables in the constraint are assigned
            const allAssigned = constraint.variables.every(v => assignment[v] !== undefined);

            if (allAssigned) {
                if (!constraint.satisfied(assignment)) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Check all constraints
     */
    private checkAllConstraints(assignment: Record<string, number>): boolean {
        for (const constraint of this.model.constraints) {
            if (!constraint.satisfied(assignment)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get current statistics
     */
    getStats(): { iterations: number; maxIterations: number } {
        return {
            iterations: this.iteration,
            maxIterations: this.maxIterations,
        };
    }
}

/**
 * Create a variable with a range domain
 */
export function createRangeVariable(name: string, min: number, max: number): Variable {
    const values: number[] = [];
    for (let i = min; i <= max; i++) {
        values.push(i);
    }
    return {
        id: name,
        name,
        domain: { values },
    };
}

/**
 * Create a variable with explicit domain values
 */
export function createDomainVariable(name: string, values: number[]): Variable {
    return {
        id: name,
        name,
        domain: { values: [...values] },
    };
}

/**
 * All-different constraint: all variables must have different values
 */
export function allDifferentConstraint(variableNames: string[]): Constraint {
    return {
        variables: variableNames,
        satisfied: (values) => {
            const assignedValues = variableNames
                .map(v => values[v])
                .filter(v => v !== undefined);
            return new Set(assignedValues).size === assignedValues.length;
        },
    };
}

/**
 * Linear constraint: sum of variables equals target
 */
export function linearEqualityConstraint(
    variableNames: string[],
    coefficients: number[],
    target: number
): Constraint {
    return {
        variables: variableNames,
        satisfied: (values) => {
            const sum = variableNames.reduce((acc, v, i) => {
                return acc + (values[v] || 0) * coefficients[i];
            }, 0);
            return sum === target;
        },
    };
}

/**
 * Element constraint: variables[i] == target
 */
export function elementConstraint(
    indexVar: string,
    variables: string[],
    targetVar: string
): Constraint {
    return {
        variables: [indexVar, ...variables, targetVar],
        satisfied: (values) => {
            const index = values[indexVar];
            if (index === undefined || index < 0 || index >= variables.length) {
                return false;
            }
            return values[variables[index]] === values[targetVar];
        },
    };
}
