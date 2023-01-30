# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Task 0 : Discuss the approach with other team member and finalize the design [1 - 2 hr] 

I assume agent and facilities are related by foreignkey facilityId on agent table.
We need to add this information data migration script and deploy the migration.
* Need to decide should (facilityId, customAgentId) is unique.
* customAgentId can be null or not
* if customAgentId is null probably unique contraint will not work
* if decided that customAgentId will not null then we need to have a migration strategy 
* to fill up customAgentId to some value

For the rest of the discussion I am allowing customAgentId to be null so we will not have 
database level check and those need to be done in client side code.

#### Task 1 : Adding the customAgentId field to agent table. [1 hr]

Use the migation script to create alter table add column for custom agentId
and run the migration script in dev/integ and then to prod.

Acceptance Criteria
* Database field is added in all environment
* This should not cause any issue with existing system.
* Acceptance tests should pass.

Once this is completed only then other tasks can be started.

#### Task 2 : Code changes for api to save / retrieve customAgentId by facilities [1 hr]
This will be called by the `task 2`

Acceptance Criteria
* Able to update/view customAgentId via Api
* Ensure that duplicate customAgentId is not allowed
* Api Acceptance Test  for the changes.
* Unit Test for the changes.

#### Task 3 : Code changes for UI for adding/changing customAgentId by facilities [1 hr]  

There will be existing UI where facilities will view/edit the agent.
We need to add a new field here.

Acceptance Criteria
* Able to update/view customAgentId via UI
* End to End testing
* Unit test for UI

#### Task 4 : Code changes for the reporting [1 hr]
If customAgentId exist use that otherwise use InternalId

* Without these changes report should still work.
* After the changes we can see report

Acceptance Criteria
* Updated Reports which displays customAgentId if it exists.
* Unit Test changes
* Acceptance Test changes

