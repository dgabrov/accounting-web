export const processKeyDown = (onEnter: ((ev?: any)=> any)|null, onCancel: (() => any)|null, ctrlOnEnter: boolean): (event : any) => void => {
    return (event: React.KeyboardEvent) => {
        let processed: boolean = false;

        if (event.key === 'Enter') {
            if (onEnter !== null) {
                if (ctrlOnEnter) {
                    if (event.ctrlKey) {
                        onEnter(event);
                        processed = true;
                    }
                }
                else {
                    onEnter(event);
                    processed = true;
                }
            }
        }
        else if (event.key === 'Escape') {
            if (onCancel !== null) {
                onCancel();
                processed = true;
            }
        }

        if (processed) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
}
