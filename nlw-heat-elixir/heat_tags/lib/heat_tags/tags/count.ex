defmodule HeatTags.Tags.Count do
  # Este modulo vai servir para fazer a contagem de tags nas mensagens do dia

  # encurtando nome dos outros modulos
  alias HeatTags.Messages.Get

  def call do
    # pegando todas as messages do dia
    Get.today_messages()
    # fazendo busca de tags em uma funcao especial do elixir(semelhante ao map())
    |> Task.async_stream(fn message -> count_words(message.message) end)
    # Realizando reducao de todas as tags de cada mensagem
    |> Enum.reduce(%{}, fn elem, acc -> sum_values(elem, acc) end)
    # só para ver no terminal
    |> IO.inspect()
  end

  # funcao contar word
  defp count_words(message) do
    message
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
