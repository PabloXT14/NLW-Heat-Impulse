# module = agrupamento de funcoes
defmodule HeatTagsWeb.MessagesController do
  # definindo o modulo como controller
  use HeatTagsWeb, :controller

  # encurtando nome dos outros modulos (podemos usar apenas Message Create agora)
  alias HeatTags.Message
  alias HeatTags.Messages.Create

  # criando funcao de controller => nameFunction(conexao, parametrosDaConexao)
  # parametrosDaConexao: dados que enviamos no body da requisicao ai server
  # conexao: o que teremos/enviaremos após se conectar/realizar com sucesso a requisicao
  def create(conn, params) do
    # text(conn, "RECEBI A REQUISIÇÃO") # outro mode de written
    # Comando criar migration(migraçao/relacao com o DB) com o banco de dados: mix ecto.gen.migration create_messages

    params
    # enviando params(da message) para serem criada no DB
    |> Create.call()
    # lidando com "ok" e "error" da insercao da message
    |> handle_create(conn)
  end

  # lindo com message bem suscedida
  defp handle_create({:ok, %Message{} = message}, conn) do
    conn
    # devolvendo status de message criada
    |> put_status(:created)
    # criando view de resposta(em json) para ser renderizado na tela
    |> render("create.json", message: message)
  end

  # lindo com message com erro
  defp handle_create({:error, %{result: result, status: status}}, conn) do
    conn
    # devolvendo status de erro
    |> put_status(status)
    # Chamando view de Erro (como nao tem o mesmo nome do module message_controller precisamos chamar antes)
    |> put_view(HeatTagsWeb.ErrorView)
    # criando view de resposta(em json) para ser renderizado na tela
    |> render("error.json", result: result)
  end
end
