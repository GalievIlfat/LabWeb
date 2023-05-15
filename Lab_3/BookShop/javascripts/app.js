function loadBody() {
	$(document).ready(function () {
		$.getJSON("clients.json", function (toDoObjects) {
			main(toDoObjects);
		});
	});
}

var main = function (toDoObjects) {
    "use strict";
    var toDos = toDoObjects.map(function (toDo) {
        // просто возвращаем описание
        // этой задачи
        return toDo.description;
    });

    var $ = jQuery;
    
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            var $element = $(element), $content;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $(".content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDos.length - 1; i > -1; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (author) {
                    $content.append($("<li>").text(author));
                });
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                var orginized = convertToTags(toDoObjects)
                // ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
                console.log("щелчок на вкладке Теги");
                
                // var organizedByTag = toDoObjects;
                orginized.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $(".content").append($tagName);
                    $(".content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                $(".content").append("<p>");
                $(".content").append("<h3>Клиент: </h3>");
                $(".content").append("<input id='description'>");
                $(".content").append("<br>");
                $(".content").append("<p>");
                $(".content").append("<h3>Дата посещения: </h3>");
                $(".content").append("<input id='tags'>");
                $(".content").append("<p>");
                $(".content").append("<button>Добавить</button>");
                $(".content input").addClass("input");
                $(".content button").addClass("button");
            }
            return false;
        })
    });

    $(".content").on("click", ".button", function () {
        if ($(".input").val() != "") {
            toDos.push($(".input").val());
            //alert("Предложение успешно добавлено в список!");
        }
        else {
            alert("ERROR: Длина добавляемого предложения должна быть > 0");
        }
        var newDescription = $("#description").val();
        var newTags = $("#tags").val().replace(/\s/g, "").split(',');

        var result = updateJson(toDoObjects, newDescription, newTags);

        // organizedByTag = organizeByTags(result);
        // var json = JSON.parse(result);
        
    });

    function convertToTags(obj) {
        var newToDosDescription = obj.map(function (newToDo) {
            return newToDo.description;
        });
    
        var newToDosTags = obj.map(function (toDo) {
            return toDo.tags;
        });
    
        var newTags = function(name, toDos) {
            this.name = name;
            this.toDos = toDos;
        }
    
        var newArray = [];
        var arrayTags = [];
        var strTag = '';
        var array = [];
    
        for (var i = 0; i < newToDosTags.length; i++) {
            for (var j = 0; j < newToDosTags[i].length; j++) {
                if (arrayTags.indexOf(newToDosTags[i][j]) == -1) {
                    arrayTags.push(newToDosTags[i][j]);
                    strTag = newToDosTags[i][j];
                    for (var k = 0; k < newToDosDescription.length; k++) {
                        if (newToDosTags[k].indexOf(newToDosTags[i][j]) != -1) {
                            newArray.push(newToDosDescription[k]);
                        }
                    }
    
                    var x = new newTags(strTag, newArray);
                    newArray = [];
                    array.push(x);
                }
            }
        }
    
        let json = JSON.stringify(array);
        json = JSON.parse(json);
    
        return json;
    }
    
    function updateJson(toDoObjects, newDescription, newTags) {
        var newJsonObject = function (description, tags) {
            this.description = description;
            this.tags = tags
        }
    
        var newJson = new newJsonObject(newDescription, newTags);
        toDoObjects.push(newJson);
        alert("Предложение успешно добавлено в список!");
    
        return toDoObjects;
    }

};





$(document).ready(function () {
    $.getJSON("Data.json", function (toDoObjects) {
        // вызываем функцию main с задачами в качестве аргумента
        main(toDoObjects);
    });
});
