defmodule HeatTags.Messages.Get do
  # Este modulo vai servir para fazer uma listagem de palavras de todas as mensagens enviadas no dia

  # funcionalidade de busca no DB
  import Ecto.Query

  # encurtando nome dos outros modulos
  alias HeatTags.{Message, Repo}

  def today_messages() do
    # pegando data do dia actual(hj)
    today = Date.utc_today()

    # fazendo busca na table message do DB, de messages com data igual a today(obs: convertemos data+hora no inserted_at só para formato date)
    query = from(message in Message, where: type(message.inserted_at, :date) == ^today)
    # buscando por toda a table
    Repo.all(query)
  end
end
