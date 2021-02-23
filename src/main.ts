import * as luxon from "luxon";
require("./style.css");

enum Weekday {
	Monday = 1,
	Tuesday,
	Wednesday,
	Thursday,
	Friday,
	Saturday,
	Sunday,
}

interface Teacher {
	name: string;
	position: string;
}

interface LessonInterface {
	weekday: Weekday;
	slot: number;
	type: "Lab" | "Practice" | "Lecture";
	subgroup?: 0 | 1 | 2;
	occurence?: "every" | "odd" | "even" | number[];
	startWeek?: number;
	endWeek?: number;
}

interface CourseInterface {
	name: string;
	lector: Teacher;
	practitioner?: Teacher;
	laborant?: Teacher;
	lessons: LessonInterface[];
}

interface SourceInterface {
	startingWeek: number;
	semesterDuration: number;
	weekLength: number;
	lessonTimespans: (string | luxon.Interval)[];
	courses: CourseInterface[];
	holidays?: luxon.DateTime[];
}

const source: SourceInterface = {
	startingWeek: 4,
	semesterDuration: 16,
	weekLength: 4,
	lessonTimespans: [
		"09:00/PT01H20M",
		"10:30/PT01H20M",
		"12:10/PT01H20M",
		"13:40/PT01H20M",
	],
	courses: [
		{
			name: "Криптографічні системи захисту інформації",
			lector: {
				name: "Фесенко А. О.",
				position: "доц.",
			},
			lessons: [
				{
					weekday: Weekday.Monday,
					slot: 1,
					type: "Lab",
					subgroup: 2,
					endWeek: 14,
				},
				{
					weekday: Weekday.Monday,
					slot: 2,
					type: "Lecture",
					endWeek: 14,
				},
				{
					weekday: Weekday.Monday,
					slot: 4,
					type: "Lab",
					subgroup: 1,
					startWeek: 8,
					endWeek: 14,
					occurence: "even",
				},
				{
					weekday: Weekday.Tuesday,
					slot: 1,
					type: "Lab",
					subgroup: 1,
					// eslint-disable-next-line array-bracket-newline
					occurence: [
						1,
						2,
						3,
						4,
						5,
						6,
						7,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						16,
					],
				},
				{
					weekday: Weekday.Wednesday,
					slot: 2,
					type: "Practice",
					// eslint-disable-next-line array-bracket-newline
					occurence: [
						1,
						2,
						3,
						// 4,
						8,
						9,
						10,
						11,
						12,
						13,
						14,
						15,
						16,
					],
				},
				{
					weekday: Weekday.Wednesday,
					slot: 2,
					type: "Lecture",
					// eslint-disable-next-line array-bracket-newline
					occurence: [4],
				},
				{
					weekday: Weekday.Wednesday,
					slot: 3,
					type: "Lecture",
					// eslint-disable-next-line array-bracket-newline
					occurence: [2, 3],
				},
				{
					weekday: Weekday.Thursday,
					slot: 1,
					type: "Lab",
					subgroup: 1,
					occurence: "even",
					startWeek: 2,
					endWeek: 16,
				},
				{
					weekday: Weekday.Thursday,
					slot: 3,
					type: "Lab",
					subgroup: 2,
					occurence: "even",
					startWeek: 2,
					endWeek: 16,
				},
				{
					weekday: Weekday.Thursday,
					slot: 4,
					type: "Lab",
					subgroup: 2,
					occurence: "even",
					startWeek: 6,
					endWeek: 16,
				},
			],
		},
	],
	/* eslint-disable array-bracket-newline */
	holidays: [luxon.DateTime.fromISO("2021-03-08")],
	/* eslint-enable array-bracket-newline */
};

class Teacher implements Teacher {
	public name: string;
	public position: string;
	constructor(name: string, position: string) {
		this.name = name;
		this.position = position;
	}
}

class Element {
	static fromSelector(selector: string): HTMLElement {
		const tag = (selector.match(/^[\w-]+/) || ["p"])[0];
		const classes = (selector.match(/\.[\w-]+/g) || []).map((x) =>
			x.slice(1)
		);
		const properties =
			selector.matchAll(/\[([\w-]+)="?([\w-]+)?"?\]/g) || [];
		const element = document.createElement(tag);
		for (const value in classes) {
			element.classList.add(value);
		}
		for (const value in properties) {
			element.setAttribute(value[1], value[2] || "");
		}
		return element;
	}
}

class Lesson extends Element implements LessonInterface {
	public weekday;
	public slot;
	public type;
	public subgroup: 0 | 1 | 2;
	public occurence;
	public startWeek;
	public endWeek;
	public name: string;
	public teacher: Teacher;

	constructor(
		course: CourseInterface,
		{
			weekday,
			slot,
			type,
			subgroup,
			occurence,
			startWeek,
			endWeek,
		}: LessonInterface
	) {
		super();
		this.weekday = weekday;
		this.slot = slot;
		this.type = type;
		this.subgroup = subgroup || 0;
		this.occurence = occurence || "every";
		this.startWeek = startWeek;
		this.endWeek = endWeek;
		this.name = course.name;
		switch (type) {
			case "Lecture":
				this.teacher = course.lector;
				break;
			case "Lab":
				this.teacher = course.laborant || course.lector;
				break;
			case "Practice":
				this.teacher = course.practitioner || course.lector;
				break;
		}
	}
	
}

class TimetableElement extends Element {}

export {};
