import { Injectable } from "@nestjs/common";
import { HealthCheckError, HealthIndicator, HealthIndicatorResult } from "@nestjs/terminus";

export interface Dog {
    name: string,
    type: string,
}

export class DogHealthIndicator extends HealthIndicator {
    private dogs: Dog[] = [
        { name: 'Fido', type: 'goodboy'},
        { name: 'Rex', type: 'badboy'},
    ];

    async isHealthy(key: string): Promise<HealthIndicatorResult> {
        const badBoys = this.dogs.filter(dog => dog.type === 'badboy');
        const isHealthy = badBoys.length === 0;
        const result = this.getStatus(key, isHealthy, { badBoys: badBoys.length });

        if (isHealthy) {
            return result;
        }

        throw new HealthCheckError('Dogcheck failed', result);
    }
}