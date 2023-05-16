function loadBody() {
	$(document).ready(function () {
        $.ajaxSetup({ cache: false });
		$.getJSON("/CRINGE", function (bookObjects) {
			main(bookObjects);
		});
	});
}

var main = function (bookObjects) {
    "use strict";
    var books = bookObjects.map(function (book) {
        // просто возвращаем описание
        // этой задачи
        return book.description;
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
                for (var i = books.length - 1; i > -1; i--) {
                    $content.append($("<li>").text(books[i]));
                }
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                books.forEach(function (author) {
                    $content.append($("<li>").text(author));
                });
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                var orginized = convertToTags(bookObjects)
                // ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ
                console.log("щелчок на вкладке Теги");
                
                // var organizedByTag = bookObjects;
                orginized.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                    tag.books.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $(".content").append($tagName);
                    $(".content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                $(".content").append("<p>");
                $(".content").append("<h3>Описание книг: </h3>");
                $(".content").append("<input id='description'>");
                $(".content").append("<br>");
                $(".content").append("<p>");
                $(".content").append("<h3>Жанр: </h3>");
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
            books.push($(".input").val());
            //alert("Предложение успешно добавлено в список!");
        }
        else {
            alert("ERROR: Длина добавляемого предложения должна быть > 0");
        }
        var newDescription = $("#description").val();
        var newTags = $("#tags").val().replace(/\s/g, "").split(',');

        var newRecord = {
			"description": newDescription,
			"tags": newTags
		}

		$.post("/CRINGE", newRecord, function (result) {
			console.log(result);
			
			bookObjects.push(newRecord);

			
			
			$("#description").val("");
			$("#tags").val("");
		});

        // var result = updateJson(bookObjects, newDescription, newTags);

        // organizedByTag = organizeByTags(result);
        // var json = JSON.parse(result);
        
    });

    function convertToTags(obj) {
        var newbooksDescription = obj.map(function (newbook) {
            return newbook.description;
        });
    
        var newbooksTags = obj.map(function (book) {
            return book.tags;
        });
    
        var newTags = function(name, books) {
            this.name = name;
            this.books = books;
        }
    
        var newArray = [];
        var arrayTags = [];
        var strTag = '';
        var array = [];
    
        for (var i = 0; i < newbooksTags.length; i++) {
            for (var j = 0; j < newbooksTags[i].length; j++) {
                if (arrayTags.indexOf(newbooksTags[i][j]) == -1) {
                    arrayTags.push(newbooksTags[i][j]);
                    strTag = newbooksTags[i][j];
                    for (var k = 0; k < newbooksDescription.length; k++) {
                        if (newbooksTags[k].indexOf(newbooksTags[i][j]) != -1) {
                            newArray.push(newbooksDescription[k]);
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
    
    function updateJson(bookObjects, newDescription, newTags) {
        var newJsonObject = function (description, tags) {
            this.description = description;
            this.tags = tags
        }
    
        var newJson = new newJsonObject(newDescription, newTags);
        bookObjects.push(newJson);
        alert("Предложение успешно добавлено в список!");
    
        return bookObjects;
    }

};





$(document).ready(function () {
    $.getJSON("/CRINGE", function (bookObjects) {
        // вызываем функцию main с задачами в качестве аргумента
        main(bookObjects);
    });
});
