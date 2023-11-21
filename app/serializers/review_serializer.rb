class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :score, :username

  def username
    object.user.username
  end
end
