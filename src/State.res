open Belt

open State__Type
module View = State__View
module Context = State__Type.Context
type t = t

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  State
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let onDownload = (state, event) => {
  open LanguageServerMule.Source.GitHub.Download.Event
  switch event {
  | Start => View.Panel.displayStatus(state, "Start downloading")->ignore
  | Progress(accum, total) =>
    // if the file is larger than 10MB than we use MB as the unit
    let message =
      total > 10485760
        ? "Downloading ( " ++
          string_of_int(accum / 1048576) ++
          " MB / " ++
          string_of_int(total / 1048576) ++ " MB )"
        : "Downloading ( " ++
          string_of_int(accum / 1024) ++
          " KB / " ++
          string_of_int(total / 1024) ++ " MB )"
    View.Panel.displayStatus(state, message)->ignore
  | Finish => View.Panel.displayStatus(state, "Downloaded")->ignore
  }
}

let sendRequest = (
  state: state,
  handleResponse: Response.t => Promise.t<unit>,
  request: Request.t,
): Promise.t<unit> => {
  let sendRequestAndHandleResponses = (state, request, handler) => {
    let onResponse = result =>
      switch result {
      | Error(error) => View.Panel.displayConnectionError(state, error)
      | Ok(response) => handler(response)
      }
    Connection.sendRequest(
      state.globalStoragePath,
      onDownload(state),
      Config.Connection.useAgdaLanguageServer(),
      state.document,
      request,
      onResponse,
    )->Promise.flatMap(result =>
      switch result {
      | Error(error) => View.Panel.displayConnectionError(state, error)
      | Ok(status) => View.Panel.displayConnectionStatus(state, status)
      }
    )
  }

  state.agdaRequestQueue->RequestQueue.push(
    request => sendRequestAndHandleResponses(state, request, handleResponse),
    request,
  )
}

// construction/destruction
let destroy = (state, alsoRemoveFromRegistry) => {
  if alsoRemoveFromRegistry {
    state.onRemoveFromRegistry->Chan.emit()
  }
  state.onRemoveFromRegistry->Chan.destroy
  state.goals->Array.forEach(Goal.destroy)
  state.decoration->Decoration.destroy
  state.subscriptions->Array.forEach(VSCode.Disposable.dispose)
  Connection.stop()
  // TODO: delete files in `.indirectHighlightingFileNames`
}

let make = (chan, globalStoragePath, extensionPath, editor) => {
  editor: editor,
  document: VSCode.TextEditor.document(editor),
  panelCache: ViewCache.make(),
  runningInfoLog: [],
  goals: [],
  decoration: Decoration.make(),
  cursor: None,
  editorIM: IM.make(chan),
  promptIM: IM.make(chan),
  subscriptions: [],
  onRemoveFromRegistry: Chan.make(),
  agdaRequestQueue: RequestQueue.make(),
  globalStoragePath: globalStoragePath,
  extensionPath: extensionPath,
}
