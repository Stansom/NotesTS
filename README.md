# NotesApp

This is refactored version of my previous **Notes** app which was written in pure JS, HTML, CSS without any libraries
used.<br>
https://stansom.github.io/NotesApp/ <br>
Now it's TypeScript refactored, with many code improvements such as:

* Code decoupling
* Functional style
* Data-first approach
* Reactive storage
* and other improvements

Why I chose the **vanilla way**? Because I like **simple** app creation, without complicated constructions, tons of code
and gigabytes of dependencies.<br>
That's simple - You need to create a simple app? Don't over-engineering a simple problem, there is no sense to shot to a
fly with shotgun.<br>
Apps is all about a state, manipulating it and retrieving a new state as quick as possible without sudden breaks and
interruptions.<br>
Because of this the app have one 'source of truth' an Atom which contains the app state in one place. It's kind of
in-memory DB, which you can manipulate via 'commands': update note body, update note name, etc. At the time renderer is
watching for state change and re-renders the 'view' on-fly.<br>
As a result, we have highly decoupled system, view sending commands to storage and reacting to the changes to stay up to
date. The storage knows nothing about view, thanks to which we can construct any view layer on top of the storage, or
make changes which not destroy the app. This is like fusion of onion architecture, reactive architecture and functional
approach to solve problems - we have a data structure and a couple of functions to manipulate it.<br>
So we can easily add one more type of persistent data storage, like API call to a server to save a data about the notes
into a DB:<br>
`"in store.ts"` ```javascript ReactiveCell(store, debounce(saveToDB));``` <br>
`"in dbAPI.ts"` ```javascript function saveToDB(notes) {http.post('api/notes/', notes, options)}```<br>
That will be the next step of the app development a back-end app, which I want to write in Clojure.<br>
Also, I want to make an error handler, Result type monad is already done, I just need to implement the handler in the
view and make a pop-up 'window' for error representation.

<img alt="app" src="https://user-images.githubusercontent.com/77399308/144223556-46503baa-af03-45fd-976c-44535e85a1aa.jpg" width="400" height="800">
