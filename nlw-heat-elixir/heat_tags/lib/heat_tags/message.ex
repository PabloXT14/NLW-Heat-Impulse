# Schema +ou- igual a um Objeto (tem funcoes semelhantes)
defmodule HeatTags.Message do
  # definindo tipo do modulo (em Schema)
  use Ecto.Schema

  # Changeset: funcionalidade que nos permite fazer um conjunto de mudanças (no caso sera alterar a estrutura dos dados da message enviada, para podermos salvar os dados da message de forma correta no DB)
  import Ecto.Changeset

  # list de parametros +ou- igual a tipagem
  @required_params [:message, :username, :email]

  # Formatando o id mais os campos da message no formato JSON para poderem aparecer na view(message_view)
  @derive {Jason.Encoder, only: [:id] ++ @required_params}

  # schema para os dados da table messages
  schema "messages" do
    field(:message, :string)
    field(:username, :string)
    field(:email, :string)

    timestamps()
  end

  # criando Changeset
  def changeset(params) do
    # %_MODULE_{} = nome do modulo/estrutura (neste caso e = HeatTags.Message)
    %__MODULE__{}
    # cast(parametros, alteracoesNosParams)
    |> cast(params, @required_params)
    # mostrando resultados da alteracao/change
    # |> IO.inspect()
    # validando campos obrigatorios
    |> validate_required(@required_params)
    # validando tamanho da mensagem
    |> validate_length(:message, min: 1, max: 140)
    # validando formato do email (vendo se tem o @)
    |> validate_format(:email, ~r/@/)
  end
end
