import mitt from "mitt";

type ApplicationEvents = {
	notify: { type: string; message: string; icon: string };
};

const emitter = mitt<ApplicationEvents>();

export const useEvent = emitter.emit;
export const useListen = emitter.on;
