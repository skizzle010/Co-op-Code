import React, { useEffect } from "react";
import CodeMirror from "codemirror";
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/lib/codemirror.css';

const Editor = () => {
    useEffect(() => {
        const textarea = document.getElementById('realtimeEditor');
        if (textarea) {
            CodeMirror.fromTextArea(textarea, {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTag: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });
        }
    }, []);

    return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
