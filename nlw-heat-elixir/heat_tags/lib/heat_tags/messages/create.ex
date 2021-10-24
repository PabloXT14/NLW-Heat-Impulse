defmodule HeatTags.Messages.Create do
  # Este modulo vai servir para criar nossa message no DB

  # encurtando nome dos outros modulos
  alias HeatTags.{Message, Repo}

  # acao para criar message no DB
  def call(params) do
    params
    # verificando e fazendo changes no formato dos params
    |> Message.changeset()
    # responsavel por inserir a message na table do DB
    |> Repo.insert()
    # funcao/acao que lida com sucess e error da insercao no DB
    |> handle_insert()
  end

  defp handle_insert({:ok, %Message{}} = result), do: result
  defp handle_insert({:error, result}), do: {:error, %{result: result, status: :bad_request}}
end
