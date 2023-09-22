import clsx from "clsx";

function ReadOnlyEditor({ content, className }) {
    return (
        <div
            id="tinymce"
            className={clsx("mce-content-body px-4 md:px-0", className || "")}
            dangerouslySetInnerHTML={{ __html: content || "" }}
        />
    );
}

export default ReadOnlyEditor;
