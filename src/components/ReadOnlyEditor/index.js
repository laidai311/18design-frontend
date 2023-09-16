import clsx from "clsx";

function ReadOnlyEditor({ content, className }) {
    return (
        <div
            className={clsx("ck-content", className || "")}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}

export default ReadOnlyEditor;
