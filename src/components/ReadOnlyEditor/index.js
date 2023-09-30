import clsx from "clsx";

function ReadOnlyEditor({ content, className }) {
    return (
        <div
            id="tinymce"
            className={clsx("mce-content-body", className || "")}
            dangerouslySetInnerHTML={{ __html: content || "" }}
        />
    );
}

export default ReadOnlyEditor;
