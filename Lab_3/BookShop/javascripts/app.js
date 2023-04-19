var main = function () {
    "use strict";
    var toDos = [
        "Закончить писать эту книгу",
        "Вывести Грейси на прогулку в парк",
        "Ответить на электронные письма",
        "Подготовиться к лекции в понедельник",
        "Обновить несколько новых задач",
        "Купить продукты"
    ];
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
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $(".content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                $(".content").append("<input>");
                
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
            alert("Предложение успешно добавлено в список!");
        }
        else {
            alert("ERROR: Длина добавляемого предложения должна быть > 0");
        }
    });
};

main();
