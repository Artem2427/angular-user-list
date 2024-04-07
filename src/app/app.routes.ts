import { Routes } from "@angular/router";
import { UsersComponent } from "./pages/users/users.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AppRoutes } from "../app/utils/constant";
import { ForbiddenComponent } from "./pages/forbidden/forbidden.component";

export const routes: Routes = [
  { path: AppRoutes.Main, redirectTo: AppRoutes.Users, pathMatch: "full" },
  { path: AppRoutes.Users, component: UsersComponent },

  { path: AppRoutes.Forbidden, component: ForbiddenComponent },
  { path: AppRoutes.NotFound, component: NotFoundComponent },

  { path: "**", redirectTo: AppRoutes.NotFound },
];
