window.onload = function(){
  const cadastrar = document.querySelector("#cadastrar");
  const nome = document.querySelector("#nome");
  const curso = document.querySelector("#curso");
  const buscar = document.querySelector("#buscar");
  const id = document.querySelector("#id");
  const alterar = document.querySelector("#alterar");
  const deletar = document.querySelector("#deletar");
  const buscarQrCode = document.querySelector("#buscarQrCode");

  //ação de cadastrar uma pessoa e curso
  cadastrar.addEventListener("click", function(){
    let formdata = new FormData();
    formdata.append("nome",`${nome.value}`);
    formdata.append("curso",`${curso.value}`);

    fetch("https://www.jussimarleal.com.br/exemplo_api/pessoa",
    {
      body: formdata,
      method: "post",
      mode: "cors",
      cache: "default"
    }).then(()=>{
        alert("Registro efetuado com Sucesso");
        limparCampos();
      }
    );
  });

  //metodo que lista uma pessoa
  buscar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method: "get",
      mode: "cors",
      cache: "default"
    }).then(response=>{
      response.json().then(data=>{
        nome.value = data['nome'];
        curso.value = data['curso'];
      });
    });
  });

  //metodo para alterar os dados dos registros
  alterar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method: "put",
      mode: "cors",
      cache: "default",
      headers:{
        "Content-type":"application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "nome":`${nome.value}`,
        "curso":`${curso.value}`
      })
    }).then(()=>{
      alert("Registro alterado com Sucesso");
      limparCampos();
    });
  });

  //metodo para deletar um registro
  deletar.addEventListener("click", function(){
    fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
      method: "delete",
      mode: "cors",
      cache: "default"
    }).then(()=>{
      alert("Registro deletado com Sucesso");
      limparCampos();
    });
  });

  //metodo para bucar por QrCode
  buscarQrCode.addEventListener("click", function(){
    cordova.plugins.barcodeScanner.scan(
      function(result){
        var cancelado = result.cancelled;

        if(cancelado === false){
          id.value = result.text;

          fetch(`https://www.jussimarleal.com.br/exemplo_api/pessoa/${id.value}`,{
            method: "get",
            mode: "cors",
            cache: "default"
          }).then(response=>{
            response.json().then(data=>{
              nome.value = data['nome'];
              curso.value = data['curso'];
            });
          });
        };
      },
      function(error){
        alert("O escaneamento falhou: " + error);
      },
      {
        preferFrontCamera : false,
        showFlipCameraButton : true,
        showTorchButton : true,
        torchOn: false,
        saveHistory: true,
        prompt : "Aponte a um Código de barras ou QR Code",
        resultDisplayDuration: 500,
        formats : "default",
        orientation : "default",
        disableAnimations : true,
        disableSuccessBeep: false 
      }
    );
  });

  //metodo para limpar os campos
  function limparCampos(){
    nome.value = "";
    curso.value = "";
  }

  //metodo(s) para checar a conexão
  document.addEventListener("offline", onOffline, false);

  function confirma(buttonIndex){
    if(buttonIndex == 1){
      navigator.app.exitApp();
    }
  }
  
  function onOffline(){
    navigator.notification.confirm("Para usar esse app você precisa estar conectado à internet",confirma,"Aviso",['Sair','Ok']);
  }

}