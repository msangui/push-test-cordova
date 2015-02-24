/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
window.onGCMNotification = function (e) {
    switch (e.event) {
      case 'message':
        alert(e.payload.message);                
        break;
      case 'registered':
        console.info('pushPlugin.registered', e.regid);    
        break;
    }
};

window.onAPNSNotification = function (e) {
    alert(e.payload.message);
};

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        if (device.platform === 'Android') {
            window.plugins.pushNotification.register(
              function (message) {
                console.error(message);
              },
              function (errorMessage) {
                console.error('pushPugin: ' + errorMessage);
              },
              {
                senderID: '42335867482',
                ecb: "onGCMNotification"
              }
            );    
        } else if (device.platform === 'iOS') {
            window.plugins.pushNotification.register(
                function (token) {
                    console.log('pushPlugin: ' + token);
                },
                function (error) {
                    console.error('pushPugin: ' + error);
                },
                {
                    "badge":"true",
                    "sound":"true",
                    "alert":"true",
                    "ecb":"onAPNSNotification"
                });
        }
        
},
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();