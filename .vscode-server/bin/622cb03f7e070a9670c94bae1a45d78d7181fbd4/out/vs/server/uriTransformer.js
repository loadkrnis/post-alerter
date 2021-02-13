module.exports=function(t){return{transformIncoming:e=>e.scheme==="vscode-remote"?{scheme:"file",path:e.path}:e.scheme==="file"?{scheme:"vscode-local",path:e.path}:e,transformOutgoing:e=>e.scheme==="file"?{scheme:"vscode-remote",authority:t,path:e.path}:e.scheme==="vscode-local"?{scheme:"file",path:e.path}:e,transformOutgoingScheme:e=>e==="file"?"vscode-remote":e==="vscode-local"?"file":e}};

//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/622cb03f7e070a9670c94bae1a45d78d7181fbd4/core/vs/server/uriTransformer.js.map
