require 'jekyll'

site = Jekyll::Site.new(Jekyll.configuration('quiet' => true))
site.read
cases = {
  'audio local' => ['/assets/uploads/episodio.mp3', '<source src="/assets/uploads/episodio.mp3">'],
  'audio externo' => ['https://example.com/episodio.m4a', '<source src="https://example.com/episodio.m4a">'],
  'YouTube compartilhado' => ['https://youtu.be/-poQdEqW6xI?si=teste', 'https://www.youtube-nocookie.com/embed/-poQdEqW6xI'],
  'YouTube completo' => ['https://www.youtube.com/watch?v=-poQdEqW6xI&feature=shared', 'https://www.youtube-nocookie.com/embed/-poQdEqW6xI']
}
cases.each do |name, (source, expected)|
  publication = { 'title' => 'Episódio de teste', 'audio_link' => source }
  template = site.liquid_renderer.file('media-test').parse('{% include audio.html publication=publication %}')
  html = template.render!(site.site_payload.merge('publication' => publication), registers: { site: site })
  abort "Falha: #{name}" unless html.include?(expected)
  abort "YouTube enviado ao player de áudio: #{name}" if name.start_with?('YouTube') && html.include?('<audio')
  puts "OK: #{name}"
end
