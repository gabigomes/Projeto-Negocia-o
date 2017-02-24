function CadastrarMercadoria(){

    var codigo = $('#codigo').val();
    var tipo  = $('#tipo').val();
    var descricao = $('#descricao').val();
    var quantidade = $('#quantidade').val();
    var preco = $('#preco').val();
    var negociacao = $('#negociacao').val();

    if (codigo == "") {
        myApp.alert("Informe o codigo","Erro");
        return;
    }
    if (tipo == "") {
        myApp.alert("Informe o tipo", "Erro");
        return;
    }
    if (descricao == "") {
        myApp.alert("Informe a descricao", "Erro");
        return;
    }
    if (quantidade == "") {
        myApp.alert("Informe a quantidade", "Erro");
        return;
    }
    if (preco == "") {
        myApp.alert("Informe o preço", "Erro");
        return;
    }
    if (negociacao == "") {
        myApp.alert("Informe a negociacao", "Erro");
        return;
    }

    $.post("php/query.php",{
        sql: "INSERT INTO `mercadoria` (`codigo`, `tipo`, `descricao`, `quantidade`, `preco`, `negociacao`) VALUES ('" 
            + codigo.replace("'", "''") + "', '" 
            + tipo.replace("'", "''") + "', '" 
            + descricao.replace("'", "''") + "', '" 
            + quantidade.replace(",", ".") + "', '" 
            + preco.replace(",", ".") + "', '" 
            + negociacao + "');"

    }, function(data, status){
        myApp.alert(data, "Cadastro");
        mainView.router.reloadPage("listaMercadorias.html")
    });

}
function MostrarMercadorias(descricao){

    $.post("php/select.php",{

        sql: "SELECT codigo, tipo, descricao, quantidade, concat('R$ ',format(preco,2,'de_DE')) as preco, CASE negociacao WHEN 1 THEN '<font color=red><b>Compra</b></font>' WHEN 0 THEN '<font color=green><b>Venda</b></font>' END FROM mercadoria WHERE descricao LIKE '%" + descricao.replace("'", "''") + "%'"

    }, function(data, status){

        var objData = jQuery.parseJSON(data);

        var results = "<br>" + objData.length + " resultado(s) encontrados<br>";

        results += "<table class='pure-table pure-table-horizontal'>"
                        +"<thead>"
                            +"<tr>"
                                +"<th width='8%'>Código</th>"
                                +"<th width='18%'>Tipo</th>"
                                +"<th width='54%'>Descriçao</th>"
                                +"<th width='10%'>Quantidade</th>"
                                +"<th width='10%'>Preço</th>"
                                +"<th width='10%'>Negociaçao</th>"
                            +"</tr>"
                        +"</thead>"
                    +"<tbody>";

        $.each(objData, function (key, data) {
            results += "<tr>";
            $.each(data, function (index, data) {
                results += "<td>" + data + "</td>";
            })
            results += "</tr>";
        })

        results += "</tbody></table>";

        if (objData.length == 0){
            results += "<h3><font color=red>Nenhum resultado encontrado!</font></h3>";
        }

        document.getElementById("results").innerHTML = results;

    }); 

}