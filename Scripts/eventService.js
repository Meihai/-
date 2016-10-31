// eventService.js
// 定义事件处理

Event.Register = function (evtname,handle) {
    Event.handles[evtname] = handle;
};

Event.GetHandle = function(name)
{
    return Event.handles[name];
}

Event.Fire = function(name,sender) {
    var handle = Event.GetHandle(name);
    var args = [];
    args.push(arguments[0]);
    for (var i = 2; i < arguments.length; ++i)
        args.push(arguments[i]);
    if (handle) {
        handle.apply(sender, args);
    }
};