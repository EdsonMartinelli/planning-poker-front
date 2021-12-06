import { Component, Input, OnInit } from "@angular/core"
import { Router } from "@angular/router"

@Component({
	selector: "story-button",
	templateUrl: "./story-button.component.html",
	styleUrls: ["./story-button.component.css"]
})
export class StoryButtonComponent implements OnInit {
	@Input() title!: string
	@Input() details!: string
	@Input() storyId!: string

	constructor(private router: Router) {}

	ngOnInit(): void {}

	onClickStory(storyId: string) {
		const navigateUrl = this.router.url.split("/").slice(1, 3)
		navigateUrl.push(storyId)

		this.router.navigate(navigateUrl)
	}
}