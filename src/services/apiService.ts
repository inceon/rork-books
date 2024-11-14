import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// [
// 	{ path: "hello", component: xN, pathMatch: "full" },
// 	{ path: "login", component: TN, pathMatch: "full" },
// 	{ path: "after-login-sync", component: GN, pathMatch: "full" },
// 	{ path: "logout", component: RN, pathMatch: "full" },
// 	{ path: "auto-re-login", component: zN, pathMatch: "full" },
// 	{ path: "recover", component: XN },
// 	{ path: "signup", component: sF, pathMatch: "full" },
// 	{ path: "not-logged-in-debug", component: yF, data: d4 },
// 	{ path: "migration-db-to-ver-2", component: SF },
// 	{ path: "migrations-regular", component: BF },
// 	{
// 			path: "tech",
// 			component: RF,
// 			children: [
// 					{ path: "", pathMatch: "full", redirectTo: "/tech/storage" },
// 					{ path: "storage", component: zF },
// 			],
// 	},
// 	{
// 			path: "",
// 			component: sL,
// 			children: [
// 					{ path: "", pathMatch: "full", redirectTo: "/app/dashboard" },
// 					{ path: "migration-db-to-ver-5", component: hL },
// 					{ path: "app/analytics-year-summary", component: _L },
// 					{ path: "app/system-stories", component: qL },
// 					{
// 							path: "app",
// 							component: vR,
// 							children: [
// 									{ path: "", pathMatch: "full", redirectTo: "/app/dashboard" },
// 									{ path: "marafon/:uid", component: OY },
// 									{ path: "dashboard", component: pj },
// 									{ path: "dashboard/donate", component: Xj },
// 									{ path: "books/search", component: SH },
// 									{
// 											path: "books",
// 											children: [
// 													{ path: "", pathMatch: "full", component: yR },
// 													{ path: "collections", component: HH },
// 													{ path: "collections/collection/:uid", component: tz },
// 													{ path: "collections/constant-collection/:constantCollectionType", component: pz },
// 											],
// 									},
// 									{
// 											path: "analytics",
// 											component: vz,
// 											children: [
// 													{ path: "", pathMatch: "full", component: $z },
// 													{ path: "calendar", component: EW },
// 											],
// 									},
// 									{
// 											path: "social/settings",
// 											component: $W,
// 											children: [
// 													{ path: "", pathMatch: "full", component: QW },
// 													{ path: "basic", component: a$ },
// 													{ path: "appearance", component: S$ },
// 													{ path: "rating", component: P$ },
// 													{ path: "focus-mode", component: I$ },
// 													{ path: "remove-account", component: U$ },
// 													{ path: "catalog", component: iq },
// 													{ path: "socials", component: uq },
// 													{ path: "rork-basic-vs-premium", component: kq },
// 													{ path: "debug", component: yF, data: y4 },
// 											],
// 									},
// 									{
// 											path: "social",
// 											component: Dq,
// 											children: [
// 													{ path: "", pathMatch: "full", redirectTo: "feed" },
// 													{ path: "notifications", component: Lq },
// 													{ path: "search", component: SK },
// 													{ path: "my-account", component: PZ },
// 													{ path: "account/:id", component: zZ },
// 													{
// 															path: "account/:id/people",
// 															component: KQ,
// 															children: [
// 																	{ path: "mutual", component: pK, data: f4 },
// 																	{ path: "followers", component: pK, data: x4 },
// 																	{ path: "following", component: pK, data: k4 },
// 																	{ path: "reviews", component: t0 },
// 															],
// 													},
// 													{
// 															path: "feed",
// 															component: f0,
// 															children: [
// 																	{ path: "", pathMatch: "full", redirectTo: "personal" },
// 																	{ path: "personal", component: A0 },
// 																	{ path: "live", component: P0 },
// 																	{ path: "last-rated", component: I0 },
// 																	{ path: "challenges", component: D1 },
// 																	{ path: "multifeed-friends", component: U1 },
// 															],
// 													},
// 													{ path: "services-navigation", component: t2 },
// 											],
// 									},
// 							],
// 					},
// 			],
// 	},
// 	{ path: "**", redirectTo: "/app/dashboard" },
// ],
// ];

export const backendUrl = window.location.origin;
const apiService: AxiosInstance = axios.create({
	baseURL: 'https://api.researcher.cloud',
});

function getAccessTokenFromCookie(): string | undefined {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("jwtToken") || Cookies.get('access_token');
};

function addAccessTokenInterceptor(): void {
	let accessToken = getAccessTokenFromCookie();
	apiService.interceptors.request.use((config: InternalAxiosRequestConfig) => {
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`;
		}
		return config;
	});
};
export { apiService, addAccessTokenInterceptor };