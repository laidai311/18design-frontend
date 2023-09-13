import clsx from "clsx";

function Modal({ open, onClose, children }) {
    return (
        <div
            className={clsx("relative z-10 transition-opacity", {
                "opacity-0 pointer-events-none": !open,
            })}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div
                className={clsx(
                    "fixed inset-0 bg-black/40 opacity-0 transition-opacity",
                    { "!opacity-100": open }
                )}
            />

            <div className="fixed inset-0 z-10 w-screen max-h-screen overflow-y-auto">
                <div
                    onClick={onClose || null}
                    className="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={clsx(
                            "relative transform rounded-lg bg-white shadow-xl transition-all sm:my-8 w-full sm:max-w-lg translate-y-0 duration-300",
                            { "!translate-y-3": !open }
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
