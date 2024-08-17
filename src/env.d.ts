/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Author = typeof import("astro:db").User.$inferSelect;

interface ImportMetaEnv {

}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null
		author: import("lucia").Author | null
		dbUser: Author | null
		isLoggedIn: boolean
	}
}