class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :score
end
