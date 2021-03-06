//define(["./list", "./activityList", "dojo/query", "dojo/_base/lang", "dijit/form/Button", "dojo/_base/connect"], function (List, ActivityList, query, lang, Button, connect) {
//    var fetchItems = function () {
//            var req = new XMLHttpRequest();
//            req.open("GET", "/tasks", true);
//            req.onreadystatechange = function () {
//                if (req.readyState === 4) {
//                    handleTasksLoad(JSON.parse(req.response));
//                }
//            };
//            req.send();
//        },
//
//        fetchActivities = function () {
//            var req = new XMLHttpRequest();
//            req.open("GET", "/activities", true);
//            req.onreadystatechange = function () {
//                if (req.readyState === 4) {
//                    handleActivitiesLoad(JSON.parse(req.response));
//                }
//            };
//            req.send();
//        },
//
//        handleTasksLoad = function (items) {
//            this.list = new List();
//            connect.connect(this.list, "onDelete", this, function (item) {
//                deleteTask(item);
//            });
//            this.list.render(items);
//            document.body.appendChild(this.list.domNode);
//        },
//
//        handleActivitiesLoad = function (items) {
//            this.list2 = new ActivityList();
//            this.list2.render(items);
//            document.body.appendChild(this.list2.domNode);
//        },
//
//        deleteTask = function (item) {
//            var req = new XMLHttpRequest(),
//                data = {
//                    id: item._id   
//                };
//
//            req.open("POST", "/tasks/delete", true);
//            req.setRequestHeader('Content-Type', 'application/json');
//            req.onreadystatechange = lang.hitch(this, function () {
//                if (req.readyState === 4) {
//                    console.log(req.response);
//                }
//            });
//            req.send(JSON.stringify(data));
//        },
//
//        newTask = function () {
//            var req = new XMLHttpRequest(),
//                data = {
//                    sprint: "501803043f70a4025b000001",
//                    assigned: "5018038ddba655285b000001",
//                    project: "501800acf5609bab5a000001",
//                    title: query("#title")[0].value,
//                    text: query("#text")[0].value,
//                    priority: query("#priority")[0].value,
//                    status: query("#status")[0].value,
//                    estimate: query("#estimate")[0].value,
//                    tags: [query("#tags")[0].value]
//                };
//            req.open("POST", "/tasks/new", true);
//            req.setRequestHeader('Content-Type', 'application/json');
//            req.onreadystatechange = lang.hitch(this, function () {
//                if (req.readyState === 4) {
//                    this.list.render([JSON.parse(req.response)]);
//                }
//            });
//            req.send(JSON.stringify(data));
//        },
//
//        login = function () {
//            var req = new XMLHttpRequest(),
//                data = {
//                    email: query("#email")[0].value,
//                    password: query("#password")[0].value
//                };
//            req.open("POST", "/session/new", true);
//            req.setRequestHeader('Content-Type', 'application/json');
//            req.onreadystatechange = lang.hitch(this, function () {
//                if (req.readyState === 4) {
//                    console.log(req.response);
//                }
//            });
//            req.send(JSON.stringify(data));
//        },
//
//        logout = function () {
//            var req = new XMLHttpRequest();
//                
//            req.open("DELETE", "/session/logout", true);
//            req.onreadystatechange = lang.hitch(this, function () {
//                if (req.readyState === 4) {
//                    console.log(req.response);
//                }
//            });
//            req.send();
//        },
//
//        newUser = function () {
//            var req = new XMLHttpRequest(),
//                data = {
//                    email: query("#newEmail")[0].value,
//                    password: query("#newPassword")[0].value,
//                    firstName: query("#newFirst")[0].value,
//                    lastName: query("#newLast")[0].value,
//                    displayName: query("#newDisplay")[0].value
//                };
//            req.open("POST", "/users/new", true);
//            req.setRequestHeader('Content-Type', 'application/json');
//            req.onreadystatechange = lang.hitch(this, function () {
//                if (req.readyState === 4) {
//                    console.log(req.response);
//                }
//            });
//            req.send(JSON.stringify(data));
//        },
//
//        initForm = function () {
//            query("#newTask").on("click", lang.hitch(this, newTask));
//            query("#login").on("click", lang.hitch(this, login));
//            query("#logout").on("click", lang.hitch(this, logout));
//            query("#newUser").on("click", lang.hitch(this, newUser));
//        };
//
//    return {
//        start: function () {
//            fetchItems();
//            fetchActivities();
//            initForm();
//        }
//    };
//});

define(["js/navigation", "dojo/_base/connect", "js/workspaces/dashboard", "js/workspaces/tasks", "js/workspaces/sprints", "js/workspaces/reports", "dojo/query", "dojo/_base/lang", "dojo/dom-construct"], function (Navigation, connect, Dashboard, Tasks, Sprints, Reports, query, lang, domConstruct) {
    return {
        start: function () {
            var container = domConstruct.create("div", { className: "container" }, document.body),
                navigation = new Navigation( { items: ["Dashboard", "Tasks", "Sprints", "Reports"] } ),
                dashboard = new Dashboard(),
                tasks,
                sprints,
                reports,
                currentWorkspace = dashboard;
                

            navigation.placeAt(container);
            connect.connect(navigation, "onNavClick", lang.hitch(this, function (item, node) {
                currentWorkspace.destroy();
                switch (item) {
                case "Dashboard":
                    dashboard = new Dashboard();
                    dashboard.placeAt(container);
                    dashboard.activate();
                    currentWorkspace = dashboard;
                    break;
                case "Tasks":
                    tasks = new Tasks();
                    tasks.placeAt(container);
                    tasks.activate();
                    currentWorkspace = tasks;
                    break;
                case "Sprints":
                    sprints = new Sprints();
                    sprints.placeAt(container);
                    sprints.activate();
                    currentWorkspace = sprints;
                    break;
                case "Reports":
                    reports = new Reports();
                    reports.placeAt(container);
                    reports.activate();
                    currentWorkspace = reports;
                    break;
                }
            }));

            dashboard.placeAt(container);
            dashboard.activate();
        }
    }
});
