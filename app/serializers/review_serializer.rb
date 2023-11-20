class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :score
  # :username

  # def username
  #   self.object.user
  # end
end
