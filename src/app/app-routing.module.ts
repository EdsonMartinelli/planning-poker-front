import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"
import { AuthGuard } from "./core/guards/auth.guard"
import { GameComponent } from "./modules/game/game.component"

export const routes: Routes = [
	{
		path: "game",
		component: GameComponent
	},
	{
		path: "poker",
		loadChildren: () =>
			import("./modules/poker/poker.module").then((m) => m.PokerModule),
		canActivate: [AuthGuard]
	},
	{
		path: "login",
		loadChildren: () =>
			import("./modules/login/login.module").then((m) => m.LoginModule),
		canActivate: [AuthGuard],
		data: { notRequiresAuthentication: true }
	},
	{
		path: "sign-up",
		loadChildren: () =>
			import("./modules/sign-up/sign-up.module").then((m) => m.SignUpModule),
		canActivate: [AuthGuard],
		data: { notRequiresAuthentication: true }
	},
	{
		path: "recovery-password",
		loadChildren: () =>
			import("./modules/recovery-password/recovery-password.module").then(
				(m) => m.RecoveryPasswordModule
			),
		canActivate: [AuthGuard],
		data: { notRequiresAuthentication: true }
	},
	{ path: "**", redirectTo: "login" }
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
