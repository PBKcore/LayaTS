module sear.debug {

	export function log(message: any): void {
		console.log(message);
	}

	export function error(message: any): void {
		console.error(message);
	}

	export function showDebugPanel(): void {
		Laya.DebugPanel.init();
	}

	export function showDebugTool(): void {
		Laya.DebugTool.init();
	}

	/** 性能统计面板*/
	export function showStates(show: boolean): void {
		if (show) {
			Laya.Stat.show();
		} else {
			Laya.Stat.hide();
		}
	}
}
module sear {
	export const log: (message: any) => void = sear.debug.log;
	export const error: (message: any) => void = sear.debug.error;
}