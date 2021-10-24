defmodule HeatTags.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  # Script que serve para alterar dados no DB (no caso no PostgreSQL)
  # Comando para rodar a migrate(depois de todas as alteracoes feitas): mix ecto.migrate
  def change do
    # criando table no DB
    create table(:messages) do
      # criando campos da table
      add(:message, :string)
      add(:username, :string)
      add(:email, :string)

      # funcao para criar nossos campos (com data e hora de cada insercao de message)
      timestamps()
    end
  end
end
