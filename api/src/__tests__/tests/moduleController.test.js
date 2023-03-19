import { describe, expect, it } from "@jest/globals";
import { ModuleController } from "../moduleController.js";
import { Module } from "../schemas/module.js";
import supertest from "supertest";
const request = supertest("http://localhost:8080/api");

// create test data before all tests
beforeAll(async () => {
	// create test data
	await ModuleController.createModule({
		title: "Test Module",
		description: "Test Description",
		teachers: [],
		students: [],
		assignments: [],
		institutionName: "Test Institution",
		moduleCode: "TEST",
	});

	// create test user
	await UserController.createUser({
		password: "test",
		firstname: "testStudent",
		surname: "test",
		email: "test@module.com",
	});
});

// delete test data after all tests
afterAll(async () => {
	// delete test data
	await ModuleController.deleteModule("TEST");
});

describe("ModuleController", () => {
	// create module test data
	/*test("createModule", async () => {
			const module = await ModuleController.createModule({
				title: "Test Module",
				description: "Test Description",
				teachers: [],
				students: [],
				assignments: [],
				institutionName: "Test Institution",
				moduleCode: "TEST",
			});
			expect(module).toBeInstanceOf(Module);
		});*/

	// get module test data by module code
	it("GET module data of TEST module with module code", async () => {
		const module = await ModuleController.getModule("TEST");
		expect(module).toBeInstanceOf(Module);
	});

	// get modules test data
	it("GET modules of specific user in database", async () => {
		const req = { query: { email: "test@module.com" } };
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		await getModules(req, res); // call the function
		expect(res.status).toHaveBeenCalledWith(200); // check if status was called with 200
		expect(Array.isArray(res.json.mock.calls[0][0])).toBe(true); // check if the first argument of the first call to json is an array
	});

	// update modules test data
	it("POST update to module", async () => {
		const req = {
			body: {
				moduleCode: "TEST",
				moduleTitle: "Test Module",
				moduleDescription: "Test Description Updated",
				moduleContent: "Test Content",
			},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
		};
		await updateModule(req, res); // call the function
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json.mock.calls[0][0]).toBeInstanceOf(Module);
	});

	// add student to module test data
	it("POST student to module", async () => {
		const module = await ModuleController.addStudentToModule("TEST", "TEST");
		expect(module).toBeInstanceOf(Module);
	});

	// add assignment to module test data
	it("POST new assignment to module", async () => {
		const module = await ModuleController.addAssignmentToModule("TEST", "TEST");
		expect(module).toBeInstanceOf(Module);
	});

	// remove assignment from module test data
	it("DELETE target assignment from module", async () => {
		//removeAssignmentFromModule
	});

	// delete modules test data
	it("DELETE target module by it's code", async () => {
		const module = await ModuleController.deleteModule("TEST");
		expect(module).toBeInstanceOf(Module);
	});
});
