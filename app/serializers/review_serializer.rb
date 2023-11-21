class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :score, :username, :guid

  belongs_to :game

  def username
    object.user.username
  end

  def guid
    object.game.guid
  end
end
