defmodule HeatTags.Messages.GetEmails do
  # Este modulo vai ser responsavel por contador todos os email unicos no DB

  # funcionalidade de busca no DB
  import Ecto.Query

  # encurtando nome dos outros modulos
  alias HeatTags.Message
  alias HeatTags.Repo

  # acao/funcao que busca todos os emails
  def call do
    # query de busca (buscando todas as menssagens)
    query = from(message in Message)

    # buscando por toda a table
    Repo.all(query)
    # fazendo busca de email em uma funcao especial do elixir(semelhante ao map())
    |> Task.async_stream(fn message -> count_emails(message.email) end)
    # Realizando reducao de todos os emails de cada mensagem
    |> Enum.reduce(%{}, fn elem, acc -> sum_values(elem, acc) end)
    # só para ver no terminal
    |> IO.inspect()
  end

  # funcao contar word
  defp count_emails(email) do
    email
    # tranformando a string em um array (separando por espaco)
    |> String.split()
    # enumerando a frequencia de cada elemento no array
    |> Enum.frequencies()
  end

  # funcao que soma as tags (a frequencia da que forem iguais se soma, as que nao forem iguais permanecem sozinhas)
  defp sum_values({:ok, map1}, map2) do
    # dando um merge entre nossos dois masp (no caso de cada elem com o acumulador)
    Map.merge(map1, map2, fn key, value1, value2 -> value1 + value2 end)
  end
end
