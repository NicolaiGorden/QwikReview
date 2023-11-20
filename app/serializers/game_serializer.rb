class GameSerializer < ActiveModel::Serializer
  attributes :id, :guid, :name, :art, :average_score

  has_many :reviews

  def average_score
    scores = self.object.reviews.map { |rev| rev.score }
    scores.inject{ |sum, el| sum + el }.to_f / scores.size
  end 
end
