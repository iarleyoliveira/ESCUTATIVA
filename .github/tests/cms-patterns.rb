require 'yaml'

def fields_in(value)
  case value
  when Array then value.flat_map { |item| fields_in(item) }
  when Hash then (value.key?('pattern') ? [value] : []) + value.values.flat_map { |item| fields_in(item) }
  else []
  end
end

samples = {
  'link' => ['https://noticias.example.com/santos', 'https://example.com/com espaço'],
  'url' => ['https://www.instagram.com/oescutativa/', 'https://example.com/com espaço'],
  'audio_link' => ['https://example.com/episodios/conversas.mp3', 'https://example.com/com espaço.mp3'],
  'youtube_id' => ['https://youtu.be/-poQdEqW6xI?si=teste', 'https://outro.example.com/video'],
  'contact' => ['escutativanews@gmail.com', 'email sem arroba'],
  'advertising' => ['anuncios@example.com', 'email sem arroba']
}
fields_in(YAML.safe_load_file('.pages.yml')).each do |field|
  next unless samples.key?(field['name'])
  valid, invalid = samples.fetch(field['name'])
  pattern = Regexp.new(field.dig('pattern', 'regex'))
  abort "Padrão rejeita valor válido: #{field['name']}" unless pattern.match?(valid)
  abort "Padrão aceita valor inválido: #{field['name']}" if pattern.match?(invalid)
  puts "OK: padrão de #{field['name']}"
end
