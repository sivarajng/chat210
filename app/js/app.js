var app = angular.module('chatApp', []);

app.factory('socket', function () {
    return io.connect();

});
app.controller('chatCtrl', function ($scope, socket) {

    $scope.user;
    $scope.toUser;

    $scope.setUser = function (user) {
        if (user == 'siva') { $scope.toUser = 'priya'; } else { $scope.toUser = 'siva'; }
        $scope.user = user;
        socket.emit('setUser', $scope.user);
        $scope.msgs.push({ "message": "Welcome " + $scope.user + " !!!", "user": $scope.user, "toUser": $scope.toUser, "time": Date.now() });
    };

    $scope.welcomeMessage = "Welcome to Chat 210 v0.0.1";
    $scope.msgs = [];


    $scope.sendMessage = function () {
        $scope.msgpush = { "message": $scope.chatMessage, "user": $scope.user, "toUser": $scope.toUser, "time": Date.now() };
        //      $scope.msgs.push($scope.msgpush);
        $scope.chatMessage = '';
        socket.emit('sendMessage', $scope.msgpush);

    }

    socket.on('connect', function () {
        console.log('socket client connected');

    });

    socket.on('getMessage', function (msg) {
        console.log('received message : ' + JSON.stringify(msg));
        $scope.msgs.push(msg);
        $scope.$apply();
    });

});