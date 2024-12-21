class Helper {
	public delay(ms: number) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, ms);
        });
    }
}

export const helper = new Helper();
