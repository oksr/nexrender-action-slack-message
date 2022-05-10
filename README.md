# nexrender-action-slack-alert
Utility module for sending a Slack alert when render start/finish or render error.


## Installation

Install the module via Git :
```
npm i -g https://github.com/oksr/nexrender-action-slack-alert
```

## Usage

The output can be relative or absolute. If it's relative, the workpath will be added.
If the output is not specified, the filename "encoded.mp4" will be used.

You can add the 'debug' option to see the progress of handbrake processing. (default: false)

The 'eraseInput' option will erase the original video input after the processing. (default: false)

```
actions:{
    postrender:[{
        module: "nexrender-action-slack-alert",
        conversationId: "C011UTKEV1N",
        text: "optional text"
    }]
},
```