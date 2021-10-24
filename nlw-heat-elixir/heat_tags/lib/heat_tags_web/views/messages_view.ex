defmodule HeatTagsWeb.MessagesView do
  # definindo o modulo como uma view
  use HeatTagsWeb, :view

  # funcao que precisa de dois parametros(vindos do messages_controller, corpo da mensagem e formato dele)
  def render("create.json", %{message: message}) do
    # renderizando mensagem criada
    %{
      result: "Message created!",
      message: message
    }
  end
end
