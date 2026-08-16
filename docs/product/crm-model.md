# Attio CRM Model

## Company

`name`, `website`, `country`, `industry`, `instagram`, `currentPlatform`, `companySize`, `source`, `notes`.

## Person

`name`, `email`, `role`, `linkedin`, `instagram`, `company`.

## Deal

`projectName`, `company`, `contact`, `serviceInterest`, `editionInterest`, `estimatedValue`, `budget`, `source`, `stage`, `nextAction`, `expectedClose`, `notes`.

## Pipeline

`NEW → QUALIFIED → CONVERSATION → DISCOVERY → PROPOSAL → NEGOTIATION → WON`; `LOST` is separate.

Form integration should assert/deduplicate Person and Company using defined keys before creating a Deal. The implementation phase must document partial failure, retries and idempotency. Attio is the system of record after form submission.

